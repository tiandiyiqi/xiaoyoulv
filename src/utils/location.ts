// 浏览器定位
export const getBrowserLocation = () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      reject(new Error("浏览器不支持定位"));
    }
  });
};

// uni-app定位
export const getUniAppLocation = () => {
  return new Promise<UniApp.GetLocationSuccess>((resolve, reject) => {
    uni.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      timeout: 15000,
      success: resolve,
      fail: reject,
    });
  });
};

// 获取位置信息
export const getLocation = async () => {
  try {
    // 先尝试浏览器定位
    const position = await getBrowserLocation();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error("浏览器定位失败，尝试uni-app定位:", error);
    
    try {
      // 如果浏览器定位失败，尝试uni-app定位
      const res = await getUniAppLocation();
      return {
        latitude: res.latitude,
        longitude: res.longitude,
      };
    } catch (error) {
      console.error("uni-app定位失败:", error);
      throw new Error("获取位置信息失败");
    }
  }
}; 