
export default function isOwnerOrAdmin(currentUser, resourceOwner){
    if(currentUser?.sub ===resourceOwner || currentUser.roles=="APP_ADMIN"){
        return true;
    }
    return false
}