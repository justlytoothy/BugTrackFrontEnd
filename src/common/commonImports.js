import ActionButton from './actionbutton';
import ErrorPageComponent from './errorPageComponent';
import Footer from './footer';
import Spinner from './spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);

export const FontAwesome = FontAwesomeIcon;
const SpinnerPage = (props) => {
	return (
		<div
			className='bg-back-color w-full min-h-[100vh] text-black p-2 flex justify-center'
			onClick={props.closeIt}>
			<div className='flex flex-col justify-center'>
				<div className=''>
					<common.Spinner></common.Spinner>
				</div>
			</div>
		</div>
	);
};
const common = {
	ActionButton,
	ErrorPageComponent,
	FontAwesomeIcon,
	Footer,
	Spinner,
	SpinnerPage,
};

export default common;
