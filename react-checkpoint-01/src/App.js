import "./App.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Description from "./Description";
import Image from "./Image";
import Name from "./Name";
import Price from "./Price";

// Leave this empty to show the fallback greeting instead.
const firstName = "Eric";
const profileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

function App() {
  return (
    <main className="app-shell">
      <Container className="py-5">
        <Card className="product-card shadow-lg border-0">
          <Image />
          <Card.Body className="p-4">
            <Name />
            <Price />
            <Description />
          </Card.Body>
        </Card>

        <div className="greeting-block text-center">
          <p className="greeting-text">Hello, {firstName || "there"}!</p>

          {firstName && (
            <img
              className="profile-image"
              src={profileImage}
              alt={`${firstName} profile`}
            />
          )}
        </div>
      </Container>
    </main>
  );
}

export default App;
