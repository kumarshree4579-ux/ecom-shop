import { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#000000");

  return (
    <>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <p>Hex Value: <strong>{color}</strong></p>
    </>
  );
};

export default ColorPicker;
