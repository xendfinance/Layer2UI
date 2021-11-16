import Cleave from 'cleave.js/react';
import { CleaveOptions } from 'cleave.js/options';

type Props = {
	placeholder?: string;
	onChange?: (e: string) => void;
	value?: any;
	readOnly?: boolean;
	required?: boolean;
	minLength?: number;
	min?: number;
	cleaveConfig?: CleaveOptions;
};

function InputNumber(props: Props) {
	const { minLength, min, placeholder, onChange, required } = props;
	return (
		<>
			<Cleave
				options={{
					numeral: true,
					numeralThousandsGroupStyle: 'thousand',
					numeralDecimalScale: 8,
					...props.cleaveConfig,
				}}
				value={props.value}
				minLength={minLength ? minLength : 1}
				min={min ? min : 1}
				className="input"
				type="text"
				required={required}
				onChange={(e) => onChange && onChange(e.target.rawValue)}
				placeholder={placeholder}
				readOnly={props.readOnly && props.readOnly}
			/>
		</>
	);
}

export default InputNumber;