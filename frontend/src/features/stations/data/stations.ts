import { faker } from '@faker-js/faker'

export const stations = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    maTram: faker.internet.username({ firstName, lastName }),
    diaChi: firstName,
    maKhoa: firstName,
    sdt: faker.phone.number({ style: 'international' }),
    thongTinCap: firstName + lastName,
    ghiChu: lastName,
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    tramCo: faker.helpers.arrayElement(['2G', '3G', '4G', '5G']),
    loaiTru: faker.helpers.arrayElement([
      'monopol',
      'dayCo',
      'tamDien',
      'tuDien',
      'tuDung',
    ]),
    chuDauTu: faker.helpers.arrayElement([
      'vnpt',
      'viettel',
      'vms',
      'xaHoiHoa',
    ]),
    phongMay: faker.helpers.arrayElement([
      'shelter',
      'phongCaiTao',
      'tuCabinet',
    ]),
    maPE: lastName,
    toaDo: lastName,
    hinhAnh: [],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
