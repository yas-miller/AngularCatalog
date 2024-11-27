public class BlockedUserException: Exception {
    public BlockedUserException() : base("Пользователь заблокирован администратором") {}
}
