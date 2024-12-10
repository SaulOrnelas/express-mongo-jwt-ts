import jwt from 'jsonwebtoken';

export const generateJWT = (_id = '') => {
  return new Promise((resolve, reject) => {
    const payload = { _id }

    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY!,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('Falied to generate token')
        } else {
          resolve(token)
        }
      }
    )
  })
}