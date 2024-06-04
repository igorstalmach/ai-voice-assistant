export interface RadioButtonsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}
