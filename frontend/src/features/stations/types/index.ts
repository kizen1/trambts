type tramCoType = ['2G', '3G', '4G', '5G']

export interface Station {
  id: string
  maTram: string
  nhanVienQuanLy: string
  diaChi: string
  maKhoa: string
  sdt: string
  thongTinCap: string
  ghiChu: string
  tramCo: tramCoType
  loaiTru: string
  chuDauTu: string
  phongMay: string
  maPE: string
  toaDo: string
  hinhAnh: {
    filename: string
    path: string
  }[]
  createdAt: string
  updatedAt: string
}
