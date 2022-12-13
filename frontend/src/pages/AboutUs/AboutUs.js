import React, { useState } from "react";
import './AboutUs.scss'
function AboutUs() {
    const [user, setUser] = useState([
        {
            no: "1",
            name: "Nguyễn Văn Hưng",
            id: "20120009",
            email: "20120009@student.hcmus.edu.vn"
        },
        {
            no: "2",
            name: "Võ Văn Tài",
            id: "20120181",
            email: "20120181@student.hcmus.edu.vn",
        },
        {
            no: "3",
            name: "Nguyễn Văn Dũng",
            id: "20120459",
            email: "20120459@student.hcmus.edu.vn",
        },
        {
            no: "4",
            name: "Nguyễn Bảo Tín",
            id: "20120596",
            email: "20120596@student.hcmus.edu.vn",
        }
    ])

    return (

        <div className="about-background">
            <div className="about-title">Group 7</div>
            <div className="container">
                <div className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">No</div>
                        <div className="col col-2">Name</div>
                        <div className="col col-3">ID</div>
                        <div className="col col-4">Email</div>
                    </li>
                    {user && user.map(item => {
                        return (
                            <li className="table-row" key={item.no}>
                                <div className="col col-1" data-label="No">{item.no}</div>
                                <div className="col col-2" data-label="Name">{item.name}</div>
                                <div className="col col-3" data-label="ID">{item.id}</div>
                                <div className="col col-4" data-label="Email">{item.email}</div>
                            </li>



                        )
                    })}
                </div>
            </div>
        </div>

    )

}

export default AboutUs;