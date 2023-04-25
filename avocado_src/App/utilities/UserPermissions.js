/*import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { status2 } = await Permissions.askAsync(Permissions.PHOTO_LIBRARY);

            if (status != 'granted') {
                alert('We need permission to use your camera roll');
            }
            if (status2 != 'granted') {
                alert('We need permission to use your photo library');
            }
        }
    };
}

export default new UserPermissions();*/