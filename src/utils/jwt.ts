import jwt from 'jsonwebtoken';
import Usuario from '../model/Usuario';

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(usuario:Usuario ): string {
  return jwt.sign({ usuarioId: usuario.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '5m',
  });
}

// I choosed 8h because i prefer to make the usuario login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(usuario: Usuario, jti: string): string {
  return jwt.sign({
    usuarioId: usuario.id,
    jti,
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '8h',
  });
}

function generateTokens(usuario: Usuario, jti: string): { accessToken: string; refreshToken: string } {
  const accessToken = generateAccessToken(usuario);
  const refreshToken = generateRefreshToken(usuario, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
