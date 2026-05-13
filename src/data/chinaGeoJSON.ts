export const chinaGeoJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      id: "beijing",
      properties: { name: "北京市", id: "beijing" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[116.2,40.5],[116.7,40.5],[116.7,39.4],[116.2,39.4],[116.2,40.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "tianjin",
      properties: { name: "天津市", id: "tianjin" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[117.0,40.2],[117.6,40.2],[117.6,38.6],[117.0,38.6],[117.0,40.2]]]
      }
    },
    {
      type: "Feature" as const,
      id: "hebei",
      properties: { name: "河北省", id: "hebei" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.0,42.4],[120.5,42.4],[120.5,36.0],[114.0,36.0],[114.0,42.4]]]
      }
    },
    {
      type: "Feature" as const,
      id: "shanxi",
      properties: { name: "山西省", id: "shanxi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[110.2,40.4],[115.0,40.4],[115.0,35.0],[110.2,35.0],[110.2,40.4]]]
      }
    },
    {
      type: "Feature" as const,
      id: "neimenggu",
      properties: { name: "内蒙古", id: "neimenggu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[97.0,53.0],[126.0,53.0],[126.0,37.5],[97.0,37.5],[97.0,53.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "liaoning",
      properties: { name: "辽宁省", id: "liaoning" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[118.8,43.5],[125.5,43.5],[125.5,38.5],[118.8,38.5],[118.8,43.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "jilin",
      properties: { name: "吉林省", id: "jilin" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[121.0,46.5],[131.5,46.5],[131.5,40.0],[121.0,40.0],[121.0,46.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "heilongjiang",
      properties: { name: "黑龙江省", id: "heilongjiang" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[121.0,53.8],[135.0,53.8],[135.0,43.0],[121.0,43.0],[121.0,53.8]]]
      }
    },
    {
      type: "Feature" as const,
      id: "shanghai",
      properties: { name: "上海市", id: "shanghai" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[120.8,31.9],[122.0,31.9],[122.0,30.7],[120.8,30.7],[120.8,31.9]]]
      }
    },
    {
      type: "Feature" as const,
      id: "jiangsu",
      properties: { name: "江苏省", id: "jiangsu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[116.5,35.5],[122.5,35.5],[122.5,30.5],[116.5,30.5],[116.5,35.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "zhejiang",
      properties: { name: "浙江省", id: "zhejiang" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[118.0,31.5],[123.0,31.5],[123.0,27.0],[118.0,27.0],[118.0,31.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "anhui",
      properties: { name: "安徽省", id: "anhui" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.5,35.0],[120.0,35.0],[120.0,29.5],[114.5,29.5],[114.5,35.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "fujian",
      properties: { name: "福建省", id: "fujian" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[115.5,29.0],[122.5,29.0],[122.5,23.5],[115.5,23.5],[115.5,29.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "jiangxi",
      properties: { name: "江西省", id: "jiangxi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[113.5,31.0],[119.0,31.0],[119.0,24.5],[113.5,24.5],[113.5,31.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "shandong",
      properties: { name: "山东省", id: "shandong" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.5,38.8],[123.0,38.8],[123.0,34.0],[114.5,34.0],[114.5,38.8]]]
      }
    },
    {
      type: "Feature" as const,
      id: "henan",
      properties: { name: "河南省", id: "henan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[110.0,37.0],[116.8,37.0],[116.8,31.0],[110.0,31.0],[110.0,37.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "hubei",
      properties: { name: "湖北省", id: "hubei" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[108.5,34.0],[116.5,34.0],[116.5,29.0],[108.5,29.0],[108.5,34.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "hunan",
      properties: { name: "湖南省", id: "hunan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[108.5,30.5],[114.5,30.5],[114.5,24.5],[108.5,24.5],[108.5,30.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "guangdong",
      properties: { name: "广东省", id: "guangdong" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[109.5,26.5],[117.5,26.5],[117.5,20.0],[109.5,20.0],[109.5,26.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "guangxi",
      properties: { name: "广西", id: "guangxi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[104.5,26.5],[112.5,26.5],[112.5,20.5],[104.5,20.5],[104.5,26.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "hainan",
      properties: { name: "海南省", id: "hainan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[108.5,20.5],[111.5,20.5],[111.5,18.0],[108.5,18.0],[108.5,20.5]]]
      }
    },
    {
      type: "Feature" as const,
      id: "chongqing",
      properties: { name: "重庆市", id: "chongqing" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[105.0,33.0],[109.8,33.0],[109.8,28.0],[105.0,28.0],[105.0,33.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "sichuan",
      properties: { name: "四川省", id: "sichuan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[97.5,35.0],[108.5,35.0],[108.5,26.0],[97.5,26.0],[97.5,35.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "guizhou",
      properties: { name: "贵州省", id: "guizhou" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[103.5,30.0],[109.8,30.0],[109.8,24.5],[103.5,24.5],[103.5,30.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "yunnan",
      properties: { name: "云南省", id: "yunnan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[97.5,30.0],[106.5,30.0],[106.5,21.0],[97.5,21.0],[97.5,30.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "xizang",
      properties: { name: "西藏", id: "xizang" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[78.0,37.0],[99.0,37.0],[99.0,26.0],[78.0,26.0],[78.0,37.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "shaanxi",
      properties: { name: "陕西省", id: "shaanxi" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[105.5,40.0],[111.5,40.0],[111.5,31.5],[105.5,31.5],[105.5,40.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "gansu",
      properties: { name: "甘肃省", id: "gansu" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[92.0,43.0],[108.8,43.0],[108.8,32.0],[92.0,32.0],[92.0,43.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "qinghai",
      properties: { name: "青海省", id: "qinghai" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[89.5,40.0],[103.0,40.0],[103.0,31.0],[89.5,31.0],[89.5,40.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "ningxia",
      properties: { name: "宁夏", id: "ningxia" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[104.5,40.0],[107.5,40.0],[107.5,35.0],[104.5,35.0],[104.5,40.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "xinjiang",
      properties: { name: "新疆", id: "xinjiang" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[73.0,50.0],[96.5,50.0],[96.5,34.0],[73.0,34.0],[73.0,50.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "taiwan",
      properties: { name: "台湾省", id: "taiwan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[119.5,26.0],[123.0,26.0],[123.0,21.5],[119.5,21.5],[119.5,26.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "xianggang",
      properties: { name: "香港", id: "xianggang" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[113.8,23.0],[114.5,23.0],[114.5,22.1],[113.8,22.1],[113.8,23.0]]]
      }
    },
    {
      type: "Feature" as const,
      id: "aomen",
      properties: { name: "澳门", id: "aomen" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[113.3,22.5],[113.7,22.5],[113.7,22.0],[113.3,22.0],[113.3,22.5]]]
      }
    }
  ]
};

export type ChinaGeoJSON = typeof chinaGeoJSON;
