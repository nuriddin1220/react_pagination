import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Spinner, Alert, Form } from "react-bootstrap";
import CustomPagination from "./CustomPagination";

const MetersScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const fetchData = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/meters-daily-data/?page=${page}&meter_no=${searchQuery}`
      );
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20));
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch meters daily data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchData(1, value); // Reset to page 1 on new search
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Meters Daily Data</h1>

      {/* Search Input */}
      <Form.Group controlId="searchInput" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Meter No"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

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
                    <td>{item.meter_no || "N/A"}</td>
                    <td>
                      {item.freeze_date
                        ? new Date(item.freeze_date).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{item.p0300 || "N/A"}</td>
                    <td>{item.p0400 || "N/A"}</td>
                    <td>{item.p0500 || "N/A"}</td>
                    <td>{item.p0600 || "N/A"}</td>
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

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchData(page, searchTerm)} // Pass search term here
      />
    </Container>
  );
};

export default MetersScreen;
