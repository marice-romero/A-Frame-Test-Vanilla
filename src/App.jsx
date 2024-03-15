import "aframe";
import "ar.js";
import { useEffect, useRef } from "react";
import bulbasaur from "./assets/bulbasaur.glb";

function App() {
  const objectRef = useRef(null); // Reference for the draggable object
  useEffect(() => {
    let isDragging = false;
    let initialMousePosition = { x: 0, y: 0 };
    let initialObjectPosition = { x: 0, y: 0, z: 0 };
    const objectEl = objectRef.current; // Access the A-Frame entity via the ref
    // Function to initiate dragging (lifting the object)
    const onMouseDown = (e) => {
      isDragging = true;
      const { clientX, clientY } = e;
      initialMousePosition = { x: clientX, y: clientY };
      const position = objectEl.getAttribute("position");
      initialObjectPosition = { ...position };
      objectEl.object3D.position.y += 0.1; // Slightly lift the object
    };
    // Function to handle dragging (moving the object)
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - initialMousePosition.x) * 0.01; // Simplified movement calculation
      const dz = (e.clientY - initialMousePosition.y) * 0.01; // Moving in the XZ plane
      objectEl.object3D.position.x = initialObjectPosition.x + dx;
      objectEl.object3D.position.z = initialObjectPosition.z - dz;
    };
    // Function to end dragging (dropping the object)
    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      objectEl.object3D.position.y -= 0.1; // Lower the object back
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  return (
    <a-scene arjs="debugUIEnabled: false;">
      <a-assets>
        <a-asset-item id="bulbasaur" src={bulbasaur}></a-asset-item>
      </a-assets>

      <a-gltf-model
        src="#bulbasaur"
        scale="0.75 0.75 0.75"
        position="0 0 -5"
        ref={objectRef}
      ></a-gltf-model>
      {/* <a-box color="tomato" depth="2" height="4" width="0.5"></a-box> */}
      {/* Camera */}
      <a-entity camera></a-entity>
      <a-camera position="0 0.5 2" look-controls-enabled="false"></a-camera>
    </a-scene>
  );
}

export default App;
