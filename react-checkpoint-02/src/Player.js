import Card from "react-bootstrap/Card";

function Player({ name, team, nationality, jerseyNumber, age, imageUrl }) {
  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        style={{
          height: "280px",
          objectFit: "cover",
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Title style={{ color: "#0d1b2a", fontWeight: "700" }}>
          {name}
        </Card.Title>
        <Card.Text className="mb-2">
          <strong>Team:</strong> {team}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Nationality:</strong> {nationality}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Jersey Number:</strong> {jerseyNumber}
        </Card.Text>
        <Card.Text className="mb-0">
          <strong>Age:</strong> {age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

Player.defaultProps = {
  name: "Unknown Player",
  team: "Unknown Team",
  nationality: "Unknown Nationality",
  jerseyNumber: 0,
  age: 0,
  imageUrl: "https://via.placeholder.com/400x280?text=Player+Image",
};

export default Player;
