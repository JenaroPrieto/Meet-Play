const distance = (lat_1, lat_2, lon_1, lon_2) => {
    const R = 6371; // radio tierra en km
    const lat1 = lat_1 * (Math.PI / 180);
    const lat2 = lat_2 * (Math.PI / 180);
    const deltaLat = (lat_2 - lat_1) * (Math.PI / 180);
    const deltaLon = (lon_2 - lon_1) * (Math.PI / 180);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
}

module.exports = {
  distance,
}
