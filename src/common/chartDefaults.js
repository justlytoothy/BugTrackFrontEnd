import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
//Chart Default Sizes Responsive
ChartJS.overrides['doughnut'].plugins.legend.position = 'right';
if (window.innerWidth >= 1440) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 15,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 23,
	};
} else if (window.innerWidth >= 1024) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 12,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 20,
	};
} else if (window.innerWidth >= 768) {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 10,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 18,
	};
} else {
	ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
		...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
		size: 7,
	};
	ChartJS.defaults.plugins.title.font = {
		...ChartJS.defaults.plugins.title.font,
		size: 15,
	};
}
export const resizeChecker = () => {
	if (window.innerWidth >= 1440) {
		ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
			...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
			size: 15,
		};
		ChartJS.defaults.plugins.title.font = {
			...ChartJS.defaults.plugins.title.font,
			size: 23,
		};
	} else if (window.innerWidth >= 1024) {
		ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
			...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
			size: 12,
		};
		ChartJS.defaults.plugins.title.font = {
			...ChartJS.defaults.plugins.title.font,
			size: 20,
		};
	} else if (window.innerWidth >= 768) {
		ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
			...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
			size: 10,
		};
		ChartJS.defaults.plugins.title.font = {
			...ChartJS.defaults.plugins.title.font,
			size: 18,
		};
	} else {
		ChartJS.overrides['doughnut'].plugins.legend.labels.font = {
			...ChartJS.overrides['doughnut'].plugins.legend.labels.font,
			size: 7,
		};
		ChartJS.defaults.plugins.title.font = {
			...ChartJS.defaults.plugins.title.font,
			size: 15,
		};
	}
};


export default ChartJS;
