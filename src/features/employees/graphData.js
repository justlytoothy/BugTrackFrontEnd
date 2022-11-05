const typeData = (tickets) => {
	let bugs = 0;
	let plannedFeatures = 0;
	let complaints = 0;
	let suggestions = 0;
	let totals = [];

	tickets.forEach((ticket) => {
		if (ticket.ticket_type === 'Bug') {
			bugs++;
		}
		if (ticket.ticket_type === 'Planned Feature') {
			plannedFeatures++;
		}
		if (ticket.ticket_type === 'Complaint') {
			complaints++;
		}
		if (ticket.ticket_type === 'Suggestion') {
			suggestions++;
		}
	});
	totals = [bugs, plannedFeatures, complaints, suggestions];
	return totals;
};
const statusData = (tickets) => {
	let open = 0;
	let closed = 0;
	let onHold = 0;
	let totals = [];
	tickets.forEach((ticket) => {
		if (ticket.ticket_status === 'Open') {
			open++;
		}
		if (ticket.ticket_status === 'Closed') {
			closed++;
		}
		if (ticket.ticket_status === 'On Hold') {
			onHold++;
		}
	});
	totals = [open, closed, onHold];
	return totals;
};
const priorityData = (tickets) => {
	let low = 0;
	let medium = 0;
	let high = 0;
	let totals = [];
	tickets.forEach((ticket) => {
		if (ticket.ticket_priority === 1) {
			low++;
		}
		if (ticket.ticket_priority === 2) {
			medium++;
		}
		if (ticket.ticket_priority === 3) {
			high++;
		}
	});
	totals = [low, medium, high];
	return totals;
};
export const typeChartData = (employee) => {
	return {
		labels: ['Bugs', 'Features', 'Complaints', 'Suggestions'],
		datasets: [
			{
				label: 'Ticket Types',
				data: typeData(employee.assigned_tickets),
				backgroundColor: [
					'rgba(245, 3, 9, 1)',
					'rgba(24, 99, 187, 1)',
					'rgba(252, 150, 0, 1)',
					'rgba(81, 176, 100, 1)',
				],
				borderColor: [
					'rgba(245, 3, 9, 1)',
					'rgba(24, 99, 187, 1)',
					'rgba(252, 150, 0, 1)',
					'rgba(81, 176, 100, 1)',
				],
				borderWidth: 1,
			},
		],
	};
};
export const statusChartData = (employee) => {
	return {
		labels: ['Open', 'Closed', 'On Hold'],
		datasets: [
			{
				label: 'Ticket Status',
				data: statusData(employee.assigned_tickets),
				backgroundColor: [
					'rgba(230, 255, 110, 1)',
					'rgba(63, 195, 128, 1)',
					'rgba(249, 180, 45, 1)',
				],
				borderColor: [
					'rgba(230, 255, 110, 1)',
					'rgba(63, 195, 128, 1)',
					'rgba(249, 180, 45, 1)',
				],
				borderWidth: 1,
			},
		],
	};
};
export const priorityChartData = (employee) => {
	return {
		labels: ['Low', 'Medium', 'High'],
		datasets: [
			{
				label: 'Ticket Priority',
				data: priorityData(employee.assigned_tickets),
				backgroundColor: [
					'rgba(230, 255, 110, 1)',
					'rgba(249, 180, 45, 1)',
					'rgba(245, 3, 9, 1)',
				],
				borderColor: [
					'rgba(230, 255, 110, 1)',
					'rgba(249, 180, 45, 1)',
					'rgba(245, 3, 9, 1)',
				],
				borderWidth: 1,
			},
		],
	};
};
