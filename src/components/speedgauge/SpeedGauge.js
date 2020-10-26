const SpeedGauge = ({ speed }) => {

  const degFromSpeed = (speed) => {
    //Max speed on gauge is 140;
    let deg = (speed / 140) * 180;
    return deg;
  };

  return (
    <div className="flex justify-center items-center mt-10 mb-5 relative">
      <div className="graph relative w-64 flex justify-center items-center">
        <div className="gauge">
          <div className="slice-colors">
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
            <div className="st slice-item"></div>
          </div>
          <div className="needle z-10" style={{ transform: `rotate(${degFromSpeed(speed)}deg)` }}></div>
          <div className="gauge-center bg-gray-700"></div>
        </div>
        <div className="legends text-red-700 font-bold z-10 hidden sm:block">
          <div className="legend">0</div>
          <div className="legend">10</div>
          <div className="legend">20</div>
          <div className="legend">30</div>
          <div className="legend">40</div>
          <div className="legend">50</div>
          <div className="legend">60</div>
          <div className="legend">70</div>
          <div className="legend">80</div>
          <div className="legend">90</div>
          <div className="legend">100</div>
          <div className="legend">110</div>
          <div className="legend">120</div>
          <div className="legend">130</div>
          <div className="legend">140</div>
        </div>
      </div>
    </div>
  )
}

export default SpeedGauge;