import { useState, useEffect } from "react";
// Import components
import Navbar from "../component/navbar";
// Import pattern
import emailRegex from "../pattern/emailRegex";
// Import CSS
import "../css/admin.modules.css";
// Import axios
import axios from "axios";
// Import uuid
import { v4 as uuidv4 } from 'uuid';


const Admin = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(0);
    const [getInfo, setGetInfo] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatabase = async () => {
            const res = await axios.get(
                `http://localhost:3000/contacts`,
                { withCredentials: true },
            );
            setData(res.data.data)
        };
        fetchDatabase();
    });

    const saveNameValue = (e) => {
        setName(e.target.value);
    };

    const saveEmailValue = (e) => {
        if (emailRegex.test(e.target.value)) {
            setEmail(e.target.value);
        } else {
            setError("Invalid email")
        };
    };

    const saveDescriptionValue = (e) => {
        setDescription(e.target.value);
    };

    const saveCategoryValue = (e) => {
        setCategory(e.target.value);
    };

    const handleClickNewClient = () => {
        const fetchDatabase = async () => {
            const res = await axios.post(
                `http://localhost:3000/contacts`,
                { name, email, description, category },
                { withCredentials: true },
            );
            console.log(name, email, description, category);
            console.log(res)
        };
        fetchDatabase();
    };

    const handleClickMoreInfo = () => {
        console.log("handleclick")
        setGetInfo(!getInfo)
    };

    return (
        <div>
            <Navbar />

            <div className="admin_container">
                <div className="contact_left">
                    <div className="contact_number">
                        <p className="title_text">{data.length} contact{data.length > 1 ? "s" : ""}</p>
                    </div>
                    <div className="contact_add">
                        <p className="contact_title">New contact</p>

                        <div className="contact_add_info space">
                            <input placeholder="Name" type="text" className="input_contact_style space" onChange={saveNameValue}></input>
                            <input placeholder="Email" type="text" className="input_contact_style space" onChange={saveEmailValue}></input>
                            <input placeholder="Desciption" type="text" className="input_contact_style space" onChange={saveDescriptionValue}></input>
                            <label className="ctg space">Category</label>
                            <input placeholde="Category" type="number" className="input_contact_style space" onChange={saveCategoryValue}></input>
                        </div>
                        <div className="button_container">
                            <button className="button_admin_style" onClick={handleClickNewClient}>Create a new client</button>
                        </div>
                    </div>
                </div>

                <div className="contact_right">
                    <div className="contact_info">
                        {data.map(contact => (
                            <div key={uuidv4()} className="contact_perso">
                                <div>
                                    <p className="grey_text_name">{contact.name}</p>
                                    <p className="grey_text">{contact.email}</p>
                                </div>
                                <div>
                                    <button className="button_admin_style" onClick={handleClickMoreInfo}>More info</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {getInfo ? <div>true</div> : <div>false</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;