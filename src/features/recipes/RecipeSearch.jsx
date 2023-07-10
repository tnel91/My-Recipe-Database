const RecipeSearch = ({
  handleChange,
  query,
  handleSubmit,
  createNewRecipe
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset id="searchForm">
        <legend>Create/Search Recipes</legend>
        <div>
          <button type="button" className="button" onClick={createNewRecipe}>
            Create New Recipe
          </button>
        </div>
        <div>
          <label htmlFor="searchType">Search by:</label>
          <select className="pointer" id="searchType" onChange={handleChange}>
            <option value="Name">Name</option>
            <option value="Ingredients">Ingredients</option>
          </select>
        </div>
        <div>
          <label htmlFor="query"> Search for: </label>
          <input
            id="query"
            type="text"
            onChange={handleChange}
            value={query}
            placeholder="Search Recipes"
            required
          />
        </div>
        <div>
          <button type="submit">Find Recipes</button>
        </div>
      </fieldset>
    </form>
  )
}

export default RecipeSearch
