import Lab1 from "./Lab1";
import {Route, Routes, Navigate} from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import {Provider} from "react-redux";

export default function Labs() {
    return (
        <Provider store={store}>
            <div id="wd-labs">
                <h1>Logan Willans</h1>
                <h4>CS5610 61065 Web Development SEC 01 Summer 2 2024 [VTL-2-OL]</h4>
                <h1>Labs</h1>
                <TOC/>
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1"/>}/>
                    <Route path="Lab1" element={<Lab1/>}/>
                    <Route path="Lab2" element={<Lab2/>}/>
                    <Route path="Lab3/*" element={<Lab3/>}/>
                    <Route path="Lab4" element={<Lab4/>}/>
                    <Route path="Lab5" element={<Lab5/>}></Route>
                </Routes>
            </div>
        </Provider>
    );
}