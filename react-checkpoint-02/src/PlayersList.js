import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Player from './Player';
import players from './players';

function PlayersList() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">FIFA Player Cards</h1>
        <p className="text-muted mb-0">React JS Fundamentals Checkpoint 02</p>
      </div>

      <Row className="g-4">
        {players.map((player) => (
          <Col key={player.name} md={6} lg={3}>
            <Player {...player} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlayersList;
