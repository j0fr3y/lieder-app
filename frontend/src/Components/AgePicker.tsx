import React, { FC, ChangeEvent, useState, useEffect } from "react";

interface AgePickerProps {
  onAgeChange: (minAge: number, maxAge: number) => void;
}

const AgePicker: FC<AgePickerProps> = ({ onAgeChange }) => {
  const [ageValues, setAgeValues] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    handleInputChange();
  }, [ageValues]);

  const handleInputChange = () => {
    const minAge = ageValues.min ? Number(ageValues.min) : 0;
    const maxAge = ageValues.max ? Number(ageValues.max) : 100;

    onAgeChange(minAge, maxAge);
  };

  return (
    <div className="flex items-center gap-5 max-w-300 mx-auto">
      <p>Von</p>
      <input
        type="number"
        className=" h-1 w-28 p-3 border border-gray-300 rounded"
        onChange={(e) => {
          setAgeValues({ ...ageValues, min: e.target.value });
        }}
        value={ageValues.min}
      />
      <p>bis</p>
      <input
        type="number"
        className=" h-1 w-28 p-3 border border-gray-300 rounded"
        onChange={(e) => {
          setAgeValues({ ...ageValues, max: e.target.value });
        }}
        value={ageValues.max}
      />
    </div>
  );
};

export default AgePicker;
