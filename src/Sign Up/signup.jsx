import './signup.css'


export function SignUp() {
    return (
        <div class="signup-container">
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Create Account</button>
            </form>

            <div class="link">
                <p>Already have an account? <a href="login.html">Login</a></p>
            </div>
        </div>
    )
}