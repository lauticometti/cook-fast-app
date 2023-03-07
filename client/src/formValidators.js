// ================ NAME ================ //  
// Only letters. Min length 2. Max length 255.

export const nameValidator = (name) => {
  if (name.length < 2) throw Error('Name should to have at least 2 characters')
  if (name.length > 255) throw Error('Name can\'t to have more of 255 characters')
  if (!!name.match(/[^a-zA-Z\s]/)) throw Error('Name only can to have letters')
} 



// =============== SUMMARY =============== //  
// Min length 25. Max length 1000. Only alphanumeric chars.

export const summaryValidator = (summary) => {
  if (summary.length < 25) throw Error('Summary should to have at least 25 characters')
  if (summary.length > 1000) throw Error('Summary can\'t to have more of 1000 characters')
  if (!!summary.match(/[^a-zA-Z0-9\s]/)) throw Error('Summary only can to have alphanumeric characters')
}

// ============ HEALTH SCORE ============= //  
// It doesnt need validations
// .......................................//


// =============== STEPS ================ //  
// Min length 4. Max length 255. Only alphanumeric chars

export const stepValidator = (step) => {
  if (step.length < 4) throw Error('Step should to have at least 4 characters')
  if (step.length > 255) throw Error('Step can\'t to have more of 255 characters')
  if (!!step.match(/[^a-zA-Z0-9\s]/)) throw Error('Step only can to have alphanumeric characters')
}


// =============== IMAGE ================ //  
// Only jpg, jpeg, png and webp. 

export const imageValidator = (image) => {
  if (!image.type.match((/([^\s]+(\/(jpe?g|png|gif|webp|avif))$)/))) throw Error('The image doesnt have the correct type')
}


// =============== DIETS ================ //  
// Nothing... 


// =========== CUSTOM DIETS ============ //  
// Min length 2. Max length 20. If no any diet is selected on checkboxes, at least one custom diet.