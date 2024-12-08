import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Table, Spinner, Alert, Pagination } from 'react-bootstrap';

const MetersScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/meters-daily-data/?page=${page}`
      );

      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20));
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch meters daily data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchData(page);
    }
  };

  const renderPagination = () => {
    const items = [];

    // First and Previous buttons
    items.push(
      <Pagination.First key="first" onClick={() => handlePageChange(1)} />
    );

    if (currentPage > 1) {
      items.push(
        <Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} />
      );
    }

    // Show first three pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Ellipsis between first three and last three pages
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Show last three pages
    for (let i = Math.max(totalPages - 2, 3); i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // Next and Last buttons
    if (currentPage < totalPages) {
      items.push(
        <Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} />
      );
    }

    items.push(
      <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} />
    );

    return items;
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Meters Daily Data</h1>

      {/* Loading */}
      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Data */}
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Meter No</th>
                <th>Freeze Date</th>
                <th>P0300</th>
                <th>P0400</th>
                <th>P0500</th>
                <th>P0600</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.meter_no || 'N/A'}</td>
                    <td>{item.freeze_date ? new Date(item.freeze_date).toLocaleString() : 'N/A'}</td>
                    <td>{item.p0300 || 'N/A'}</td>
                    <td>{item.p0400 || 'N/A'}</td>
                    <td>{item.p0500 || 'N/A'}</td>
                    <td>{item.p0600 || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination Section */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>{renderPagination()}</Pagination>
      </div>
    </Container>
  );
};

export default MetersScreen;
