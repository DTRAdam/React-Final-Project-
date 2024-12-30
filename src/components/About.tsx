import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AboutProps { }

const About: FunctionComponent<AboutProps> = () => {
    return (
        <div className="about-container">
            <h1>Welcome to the Card Management System!</h1>
            <p>
                Imagine a place where you can easily store, manage, and organize all your business cards – and that's what we've built for you!
                Whether you're a business owner, a frequent networker, or just someone who likes to keep things organized, this platform
                gives you full control over your cards.
            </p>

            <section className="feature-section">
                <h2>What Can You Do Here?</h2>
                <div className="feature">
                    <h3>✨ Manage Your Cards</h3>
                    <p>
                        With a simple and intuitive interface, you can add, edit, and delete your business cards in seconds.
                        Whether you're looking to update a detail or remove an outdated card, it's all at your fingertips.
                    </p>
                </div>
                <div className="feature">
                    <h3>💖 Favorite the Best Ones</h3>
                    <p>
                        Mark your favorite cards for quick access. It's easy to find the cards that matter most, whenever you need them.
                    </p>
                </div>
            </section>

            <section className="technologies-section">
                <h2>The Technology Behind It All</h2>
                <p>
                    This project is powered by some of the best technologies in the industry. Here’s a peek behind the scenes:
                </p>
                <div className="tech-list">
                    <div className="tech-item">
                        <h4>⚛️ React</h4>
                        <p>Building a smooth, interactive UI for the best user experience.</p>
                    </div>
                    <div className="tech-item">
                        <h4>🔗 Axios</h4>
                        <p>Reliable HTTP requests to fetch and update your data seamlessly.</p>
                    </div>
                    <div className="tech-item">
                        <h4>🌐 React Router</h4>
                        <p>Effortless navigation across the app, so you can focus on managing your cards.</p>
                    </div>
                    <div className="tech-item">
                        <h4>🎨 SweetAlert2</h4>
                        <p>Beautiful, responsive alerts to make sure you’re always in control of your actions.</p>
                    </div>
                </div>
            </section>

            <section className="get-started-section">
                <h2>How to Get Started</h2>
                <p>
                    Ready to dive in? Here’s how you can start managing your cards:
                </p>
                <ul className="aboutul">
                    <li className="aboutli"><strong>Step 1:</strong> Create an account or log in.</li>
                    <li className="aboutli"><strong>Step 2:</strong> Add your business cards or any card you want to store.</li>
                    <li className="aboutli"><strong>Step 3:</strong> Mark your favorites for easy access.</li>
                </ul>
                <p>
                    <Link to="/register" className="start-btn">Get Started Now!</Link>
                </p>
            </section>

            <section className="future-section">
                <h2>What’s Coming Next?</h2>
                <p>
                    We're constantly improving the platform to provide you with the best possible experience. Here are some of the exciting
                    features we plan to roll out soon:
                </p>
                <div className="future-feature">
                    <h3>📸 Card Image Upload</h3>
                    <p>We’ll let you upload card images to make your cards even more personalized.</p>
                </div>
                <div className="future-feature">
                    <h3>🔍 Advanced Search</h3>
                    <p>Find your cards even faster with advanced search filters.</p>
                </div>
            </section>
        </div>
    );
};

export default About;
