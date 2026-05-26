import './login.css';

export function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>

            <div className="link">
                <p>Don't have an account? <a href="signup.html">Sign Up</a></p>
            </div>
        </div>
    )
}