CREATE USER react_pagination WITH PASSWORD 'react_pagination';
CREATE SCHEMA react_pagination AUTHORIZATION react_pagination;

ALTER ROLE react_pagination SET search_path TO react_pagination;

SELECT * FROM meters_daily_data ;


