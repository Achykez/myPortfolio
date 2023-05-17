

import ReactSwitch from "react-switch";


export const Switcher = (props) => {
  return (
    <>
        <ReactSwitch
            checked={props.isDarkMode}
            onChange={props.toggleTheme}
            height={30}
            width={60}
            handleDiameter={28}
            uncheckedIcon={
              <span
                style={{
                  display: "flex",
                  fontSize: "20px",
                  color: "aliceblue",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                ☽
              </span>
            }
            checkedIcon={
              <span
                style={{
                  display: "flex",
                  fontSize: "20px",
                  color: "aliceblue",
                  justifyContent: "center",
                  alignItems: "center",

                }}>
                ✺
              </span>
            }
            offColor="transparent"
            onColor="#000"
          />
    
    </>
  )
}
