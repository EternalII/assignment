### Installation
1. Clone the repository using git clone https://github.com/EternalII/assignment
2. Run `npm install` to install dependencies.
3. Set up a MySQL database and adjust the credentials in `schema.sql`.
4. Run the server using `node app.js`.
5. Make requests to fetch data. I recommend using Thunder Client, but it's possible using command-lines too. E.g. `curl get http://localhost:8080/categories | jq`, where jq is a JSON processor.

### Endpoints
- `POST /items`: Add or update an item. E.g.: `curl -X POST http://localhost:8080/items -H "Content-Type: application/json" -d '{"name": "Harry Potter", "category_id": 3}'`
- `GET /category/:id`: Get category details. E.g.: `curl get http://localhost:8080/category/3`
- `GET /items`: Get all items. E.g.: `curl get http://localhost:8080/items | jq`
- `GET /search` OR `GET /item/search`: Search item or category.
- `POST /category`: add new category. E.g: `curl -X POST http://localhost:8080/category -H "Content-Type: application/json" -d '{"name": "Tools"}'`

TEST