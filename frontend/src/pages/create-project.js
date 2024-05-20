import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formdata)
        payload.techStack = payload.techStack.split(" ")
        fetch("https://projects-xo5ixgaica-uc.a.run.app/projects", {
        // fetch("http://localhost:8000/projects", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            console.log(res);
            navigate("/projects")
        })
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section>

                    <form onSubmit={onSubmit}>
                        <header>
                            <h2>Create project</h2>
                        </header>
                        <label for="name">Project name</label>
                        <input name="name" id="name" />
                        <label for="desc">Description</label>
                        <input name="desc" id="desc" />
                        <label for="techStack">Tech stack</label>
                        <input name="techStack" id="techStack" />
                        <button type="submit">Create</button>
                    </form>
                </section>
            </main>
        </>)
}