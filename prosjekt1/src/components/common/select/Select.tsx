import styles from './select.module.css';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps { 
    options: SelectOption[];
    selected: SelectOption;
    setSelected: (option: SelectOption) => void;
}

const Select = ({options, selected, setSelected }: SelectProps) => {
    return (
        <select className={styles.selectContainer}>
            {options.map((option) => (
                <option 
                    key={option.value} 
                    value={option.value} 
                    selected={selected.value === option.value} 
                    onClick={() => setSelected(option)}>
                    {option.label}
                </option>
            ))
        }
        </select>
    );
};

export default Select;