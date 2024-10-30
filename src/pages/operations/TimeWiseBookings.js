import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

// Custom Hook for fetching data
const useFetchData = (url, options) => {
	const [data, setData] = useState([]);
	const [fetchError, setFetchError] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await fetch(url, options);
				if (!response.ok) throw new Error("Failed to fetch data");
				const result = await response.json();
				if (isMounted) setData(result);
			} catch (error) {
				console.error("Error:", error);
				if (isMounted) setFetchError(true);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [url, options]);

	return { data, fetchError };
};

// Modal Component
const Modal = ({ visible, onClose, children }) => {
	if (!visible) return null;
	return (
		<div
			className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
			onClick={onClose}
		>
			<div
				className="modal-content bg-white p-6 rounded shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<button
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
					onClick={onClose}
				>
					OK
				</button>
			</div>
		</div>
	);
};

const TimelyBookings = ({ userType }) => {
	const [centerList, setCenterList] = useState([]);
	const [sportList, setSportList] = useState([]);
	const [selectedCenter, setSelectedCenter] = useState("");
	const [selectedSport, setSelectedSport] = useState("");
	const [chosenDate, setChosenDate] = useState("");
	const [resourceList, setResourceList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Modal state
	const [modalVisible, setModalVisible] = useState(false);
	const [activeEvent, setActiveEvent] = useState(null);

	const calendarComponentRef = useRef(null);

	const API_BASE = 'http://localhost:3001/api/v1';
	const authToken = localStorage.getItem("token");

	useEffect(()=>{
		const fetchCenters = async () => {
			try {
				const response = await fetch(
					`${API_BASE}/centers`,
					{
						headers: { Authorization: `Bearer ${authToken}` },
					}
				);
				if (!response.ok) throw new Error("Failed to fetch centers");
				const centers = await response.json();
				setCenterList(centers);
			} catch (error) {
				console.error("Error fetching centers:", error);
			}
		};
		fetchCenters();
	},[])

	// Fetch sports when a center is selected
	useEffect(() => {
		if (!selectedCenter) return;
		const fetchSports = async () => {
			try {
				const response = await fetch(
					`${API_BASE}/sports?centerId=${selectedCenter}`,
					{
						headers: { Authorization: `Bearer ${authToken}` },
					}
				);
				if (!response.ok) throw new Error("Failed to fetch sports");
				const sportsData = await response.json();
				setSportList(sportsData);
			} catch (error) {
				console.error("Error fetching sports:", error);
			}
		};
		fetchSports();
	}, [selectedCenter, API_BASE, authToken]);

	const handleCenterSelection = (e) => {
		setSelectedCenter(e.target.value);
		console.log(e.target.value)
		setSelectedSport("");
		setSportList([]);
	};

	const handleSportSelection = (e) => {
		setSelectedSport(e.target.value);
	};

	const handleDateSelection = (e) => {
		setChosenDate(e.target.value);
	};

	const mapClassByType = (type) => {
		const typeClasses = {
			"Blocked / Tournament": "bg-gray-200",
			Coaching: "bg-blue-100",
			Booking: "bg-green-100",
			Completed: "bg-gray-100",
		};
		return typeClasses[type] || "bg-white";
	};

	const fetchResourcesAndEvents = async () => {
		setIsLoading(true);
		try {
			// Fetch resources
			const resourcesResponse = await fetch(
				`${API_BASE}/resources?centerId=${selectedCenter}&sportId=${selectedSport}`,
				{
					headers: { Authorization: `Bearer ${authToken}` },
				}
			);
			if (!resourcesResponse.ok) throw new Error("Failed to fetch resources");
			const resourcesData = await resourcesResponse.json();
			const formattedResources = resourcesData.map((res) => ({
				id: res._id,
				title: res.name,
			}));
			setResourceList(formattedResources);

			// Fetch events
			const bookingsResponse = await fetch(
				`${API_BASE}/bookings?userId=${selectedCenter}&sportId=${selectedSport}&date=${chosenDate}`,
				{
					headers: { Authorization: `Bearer ${authToken}` },
				}
			);
			if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");
			const bookingsData = await bookingsResponse.json();
			const formattedEvents = bookingsData.map((booking) => {
				const dateOnly = booking.date.split("T")[0];
				const startTime = `${dateOnly}T${String(booking.startTime).padStart(
					2,
					"0"
				)}:00:00`;
				const endTime = `${dateOnly}T${String(booking.endTime).padStart(
					2,
					"0"
				)}:00:00`;
				return {
					id: booking._id,
					title: booking.user ? booking.user.name : "Unknown",
					start: startTime,
					end: endTime,
					resourceId: booking.resource._id,
					className: mapClassByType(booking.type),
					extendedProps: {
						status: booking.type,
						description: booking.note,
					},
				};
			});
			setEventList(formattedEvents);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleViewBookings = (e) => {
		e.preventDefault();
		fetchResourcesAndEvents();
	};

	useEffect(() => {
		fetchResourcesAndEvents();
	}, [chosenDate]);

	const renderEventCard = (eventInfo) => (
		<div
			className="card relative shadow-md rounded-lg text-black"
			onDoubleClick={() => openModal(eventInfo.event)}
		>
			<div className="p-4">
				<div className="flex justify-between">
					<h3 className="font-semibold text-sm">{eventInfo.event.title}</h3>
					{eventInfo.event.extendedProps.status && (
						<span className="text-xs bg-yellow-200 text-red-500 px-2 py-1 rounded">
							{eventInfo.event.extendedProps.status}
						</span>
					)}
				</div>
				{eventInfo.event.extendedProps.description && (
					<p className="text-xs text-gray-600 mt-2">
						{eventInfo.event.extendedProps.description}
					</p>
				)}
			</div>
		</div>
	);

	const openModal = (event) => {
		setActiveEvent(event);
		setModalVisible(true);
	};

	const handleDateChange = (dateInfo) => {
		const newDate = dateInfo.startStr.split("T")[0];
		setChosenDate(newDate);
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar userType={userType} />
			<div className="p-6">
				<h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">
					Timely Bookings
				</h2>

				<form
					onSubmit={handleViewBookings}
					className="bg-white shadow-lg rounded-lg p-6 mb-6"
				>
					<h3 className="text-2xl font-semibold text-navyBlue mb-4">
						Filter Bookings
					</h3>
					<div className="space-y-4">
						<div>
							<label htmlFor="center" className="block text-gray-700 mb-2">
								Select Centre:
							</label>
							<select
								id="center"
								value={selectedCenter}
								onChange={handleCenterSelection}
								className="p-2 border border-gray-300 rounded-lg w-full"
								required
							>
								<option value="" disabled>
									Select Centre
								</option>
								{centerList.map((centre) => (
									<option key={centre._id} value={centre._id}>
										{centre.name}
									</option>
								))}
							</select>
						</div>

						{selectedCenter && (
							<div>
								<label htmlFor="sport" className="block text-gray-700 mb-2">
									Select Sport:
								</label>
								<select
									id="sport"
									value={selectedSport}
									onChange={handleSportSelection}
									className="p-2 border border-gray-300 rounded-lg w-full"
									required
								>
									<option value="" disabled>
										Select Sport
									</option>
									{sportList.map((sport) => (
										<option key={sport._id} value={sport._id}>
											{sport.name}
										</option>
									))}
								</select>
							</div>
						)}

						<div>
							<label htmlFor="date" className="block text-gray-700 mb-2">
								Select Date:
							</label>
							<input
								type="date"
								id="date"
								value={chosenDate}
								onChange={handleDateSelection}
								className="p-2 border border-gray-300 rounded-lg w-full"
								required
							/>
						</div>

						<div>
							<button
								type="submit"
								className="bg-navyBlue text-white py-2 px-4 rounded-lg"
							>
								View Bookings
							</button>
						</div>
					</div>
				</form>

				{isLoading && <div>Loading calendar...</div>}

				{/* Calendar */}
				{!isLoading && chosenDate && resourceList.length > 0 && (
					<div className="custom-calendar p-4 bg-gray-100 rounded-lg shadow-md">
						<FullCalendar
							ref={calendarComponentRef}
							plugins={[resourceTimeGridPlugin]}
							initialView="resourceTimeGridDay"
							initialDate={chosenDate}
							slotMinTime="04:00:00"
							slotMaxTime="22:00:00"
							allDaySlot={false}
							headerToolbar={{
								left: "prev,next today",
								center: "title",
								right: "resourceTimeGridDay",
							}}
							
							events={eventList}
							resources={resourceList}
							eventContent={renderEventCard}
							height="auto"
							slotDuration="01:00:00"
							slotLabelFormat={{
								hour: "numeric",
								minute: "2-digit",
								omitZeroMinute: true,
								meridiem: "short",
							}}
							resourceAreaWidth="15%"
							datesSet={handleDateChange}
						/>
					</div>
				)}

				{/* Modal */}
				<Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
					{activeEvent && (
						<div>
							<h2 className="text-xl font-semibold mb-4">
								{activeEvent.title}
							</h2>
							<p>
								<strong>Type:</strong> {activeEvent.extendedProps.status}
							</p>
							<p>
								<strong>Description:</strong>{" "}
								{activeEvent.extendedProps.description}
							</p>
							<p>
								<strong>Start Time:</strong>{" "}
								{activeEvent.start.toLocaleString()}
							</p>
							<p>
								<strong>End Time:</strong> {activeEvent.end.toLocaleString()}
							</p>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default TimelyBookings;
