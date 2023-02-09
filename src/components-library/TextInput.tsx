import { FC } from 'react';

type TextInputProps = {
  value: string;
  placeholder?: string;
  onChanged: (text: string) => void;
};

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  const { value, placeholder, onChanged } = props;
  return (
    <input
      type="text"
      className="form-control"
      value={value}
      placeholder={placeholder ?? '...'}
      onChange={(event) => onChanged(event.target.value)}
    />
  );
};

export default TextInput;
