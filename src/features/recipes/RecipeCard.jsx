const RecipeCard = (props) => {
  // const showDescription = () => {
  //   document.getElementById(props.id).style.display = ''
  // }

  // const hideDescription = () => {
  //   document.getElementById(props.id).style.display = 'none'
  // }

  return (
    <div
      className="recipe card pointer row"
      onClick={() => props.onClick(props.id)}
      // onMouseEnter={showDescription}
      // onMouseLeave={hideDescription}
    >
      <div className="img-wrapper col-12">
        <img src={props.image} alt="Recipe Image" />
      </div>
      <div className="col-12">
        <h5>{props.name.toUpperCase()}</h5>
      </div>
      <div className="col-12">Total Time: {props.totalTime}</div>
      <div className="col-12">Yield: {props.yield}</div>
      {/* <div className="description" id={props.id} style={{ display: 'none' }}>
        <h3>Description:</h3>
        <p>{props.description}</p>
      </div> */}
    </div>
  )
}

export default RecipeCard
