using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Helpers
{
    internal static class PasswordHelper
    {
        internal static(string, string) HashPassword(string password)
        {
            var newSaltBytesArray = GenerateSaltBytesArray();
            return (HashPassword(password, newSaltBytesArray), Convert.ToBase64String(newSaltBytesArray));
        }
        internal static string HashPassword(string password, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];

                Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

                byte[] hashedBytes = sha256.ComputeHash(saltedPassword);

                byte[] hashedPasswordWithSalt = new byte[hashedBytes.Length + salt.Length];
                Buffer.BlockCopy(salt, 0, hashedPasswordWithSalt, 0, salt.Length);
                Buffer.BlockCopy(hashedBytes, 0, hashedPasswordWithSalt, salt.Length, hashedBytes.Length);

                return Convert.ToBase64String(hashedPasswordWithSalt);
            }
        }


        internal static bool ValidatePassword(string passwordSalted, string password, string saltString)
        {
            var hashedPassword = HashPassword(passwordSalted, Convert.FromBase64String(saltString));

            return passwordSalted == hashedPassword;
        }


        internal static string GenerateSaltString()
        {
            return Convert.ToBase64String(GenerateSaltBytesArray());
        }
        internal static byte[] GenerateSaltBytesArray()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] salt = new byte[16]; // Adjust the size based on your security requirements
                rng.GetBytes(salt);
                return salt;
            }
        }
    }
}
