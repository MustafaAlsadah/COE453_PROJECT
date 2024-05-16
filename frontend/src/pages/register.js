import Navbar from "../components/navbar";

export default function Register() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section>
                    <form>
                        <header>
                            <h2>Register</h2>
                        </header>
                        <label for="email">Email</label>
                        <input name="email" id="email" type="email" />
                        <label for="password">Password</label>
                        <input name="password" id="password" type="password" />
                        <button type="submit">Login</button>
                    </form>
                </section>
            </main>
        </>
    )
}