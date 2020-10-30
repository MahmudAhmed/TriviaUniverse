import '../stylesheets/categories.css';

const CATAGORIES = [
  { "id": 1, "category": "Tandem: Random"},
  { "id": 9, "category": "General Knowledge"},
  { "id": 10, "category": "Entertainment: Books"},
  { "id": 11, "category": "Entertainment: Films"},
  { "id": 12, "category": "Entertainment: Music"},
  { "id": 13, "category": "Entertainment: Musicals & Theatres"},
  { "id": 14, "category": "Entertainment: Television"},
  { "id": 15, "category": "Entertainment: Video Games"},
  { "id": 16, "category": "Entertainment: Board Games"},
  { "id": 17, "category": "Entertainment: Science & Nature"},
]

function CategorySelection() {
  return (
    <div className="category-container">
      <h2 id="category-title">Select A Category to Begin</h2>
      <ul className="category-list">
        {
          CATAGORIES.map( (topic) => {
            return (
            <li className="categories">
              {topic.category}
            </li>
            )
          })
        }
        
      </ul>
    </div>
  );
};



export default CategorySelection;
