export default function Filter(props) {
  return (
    <div>
      <div>Filter your search by:</div>
      <div >
        <div>
          <p>Diet Type:</p>
          {/* {
            props.diets.map(diet => {
              return (
                <>
                  <label for='diet'>diet...</label>
                  <input type="checkbox" name="diet" value="" />
                </>
              )
            })
          } */}
        </div>
        <div>
          <p>Creator:</p>
            <label for='createdApi'>API</label>
            <input type="radio" name="api" value="" />

            <label for='createdUser'>User</label>
            <input type="radio" name="user" value="" />
        </div>
      </div>
    </div>
  )
}