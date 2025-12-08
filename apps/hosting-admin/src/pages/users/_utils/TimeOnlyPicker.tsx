import { DatePicker } from "../../../components";

export const TimeOnlyPicker = ({ value, setValue }) => {
  const handleChange = (newTime: {
    hour: () => never;
    minute: () => never;
  }) => {
    if (!newTime) {
      setValue(null);
      return;
    }

    const updated = value
      .hour(newTime.hour())
      .minute(newTime.minute())
      .second(0);

    setValue(updated);
  };

  return (
    <DatePicker
      picker="time"
      format="HH:mm"
      value={value}
      onChange={handleChange}
    />
  );
};
