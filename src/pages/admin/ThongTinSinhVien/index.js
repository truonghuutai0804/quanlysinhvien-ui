import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

function ThongTinSinhVien() {
    const [student, setStudent] = useState([])
    const [infoClass, setInfoClass] = useState([])
    const [infoProvince, setInfoProvince] = useState([])
    const [createInfoStudent, setCreateInfoStudent] = useState([])

    const [infoSV, setInfoSV] = useState({})
    const [editInfoSV, setEditInfoSV] = useState({})
    const [deleteInfoSV, setDeleteInfoSV] = useState({})

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)

    const handleShowXemThongTin = (info) => {
        setInfoSV(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        setEditInfoSV(info)
        setShowSuaLai(true)
    }

    const handleShowXoa = (info) => {
        setDeleteInfoSV(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXemThongTin = () => setShowXemThongTin(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const getSinhVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/student',
            }
            const response = await axios(options)
            const students = response.data.data
            if (response.data.status === 400) {
                setStudent(students)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getLop = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/class',
            }
            const response = await axios(options)
            const classes = response.data.data
            if (response.data.status === 400) {
                setInfoClass(classes)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getTinh = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/province',
            }
            const response = await axios(options)
            const provinces = response.data.data
            if (response.data.status === 400) {
                setInfoProvince(provinces)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setSinhVien = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/student',
                data: createInfoStudent,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'B???n ???? th??m m???i th??nh c??ng ', 'success')
                getSinhVien()
            }else{
                Swal.fire('Th???t b???i', 'B???n ???? th??m m???i th???t b???i ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editSinhVien = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/student/${id}`,
                data: editInfoSV,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'B???n ???? s???a th??nh c??ng ', 'success')
                getSinhVien()
            }else{
                Swal.fire('Th???t b???i', 'B???n ???? s???a th???t b???i ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deteleSinhVien = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/student/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getSinhVien()
            }
            else{
                Swal.fire('Th???t b???i', 'B???n ???? x??a th???t b???i ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinhVien()
        getLop()
        getTinh()
    }, [getSinhVien, getLop, getTinh])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-3 text-center">DANH S??CH SINH VI??N</h2>
                    <Button variant="outline-primary" className="mb-3 ms-4" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m sinh vi??n m???i
                    </Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>MSSV</th>
                                <th>H??? t??n</th>
                                <th>Gi???i t??nh</th>
                                <th>Ng??y sinh</th>
                                <th>L???p</th>
                                <th>Ng??nh h???c</th>
                                <th>Khoa</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student &&
                                student.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.MA_SV}</td>
                                        <td>{item.HOTEN_SV}</td>
                                        <td>{item.GIOITINH_SV === 1 ? 'Nam' : 'N???'}</td>
                                        <td>{moment(item.NGAYSINH_SV).format("DD/MM/YYYY")}</td>
                                        <td>{item.TEN_LOP}</td>
                                        <td>{item.TEN_CN}</td>
                                        <td>{item.TEN_KHOA}</td>
                                        <td className="table-text-center">
                                            <strong
                                                className="infor-see"
                                                onClick={() => {
                                                    handleShowXemThongTin(item)
                                                }}
                                            >
                                                <FaEye />
                                            </strong>

                                            <strong
                                                className="infor-edit"
                                                onClick={() => {
                                                    handleShowSuaLai(item)
                                                }}
                                            >
                                                <FaEdit />
                                            </strong>

                                            <strong
                                                className="infor-remove"
                                                onClick={() => {
                                                    handleShowXoa(item)
                                                }}
                                            >
                                                <FaTrashAlt />
                                            </strong>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </aside>
            </Container>

            <Modal show={showThemMoi} onHide={handleCloseThemMoi} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-new">
                        <MdAddBox size={50} />
                        TH??M SINH VI??N M???I
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <h3>Th??ng tin c?? b???n</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>M?? s???</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>H??? v?? T??n</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="HOTEN_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Ng??y sinh</strong>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="NGAYSINH_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Gi???i t??nh</strong>
                            </Form.Label>
                            <Form.Select
                                name="GIOITINH_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Ch???n gi???i t??nh</option>
                                <option value="1">Nam</option>
                                <option value="0">N???</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>L???p</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_LOP"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Ch???n l???p</option>
                                {infoClass &&
                                    infoClass.map((item, idx) => (
                                        <option key={idx} value={item.MA_LOP}>
                                            {item.TEN_LOP}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>S??? ??i???n tho???i</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SODIENTHOAI_SV"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Email c?? nh??n</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>?????a ch???</strong>
                            </Form.Label>
                            <Form.Select
                                name="MA_TINH"
                                onChange={(e) =>
                                    setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Ch???n t???nh th??nh</option>
                                {infoProvince &&
                                    infoProvince.map((item, idx) => (
                                        <option key={idx} value={item.MA_TINH}>
                                            {item.TINH_THANH}
                                        </option>
                                    ))}
                            </Form.Select>
                            <h3 className='mt-4'>Th??ng tin gia ????nh</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? t??n cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENCHA_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? t??n m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_SV"
                                    onChange={(e) =>
                                        setCreateInfoStudent({ ...createInfoStudent, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={setSinhVien}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-see">
                        <FaEye size={50} /> TH??NG TIN SINH VI??N: {infoSV.HOTEN_SV}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <aside className="border rounded border-secondary mb-2 ">
                            <h5 className="text-center my-2">Th??ng tin c?? b???n</h5>
                            <aside className="ms-4">
                                <p>
                                    <strong>MSSV: </strong> {infoSV.MA_SV}
                                </p>
                                <p>
                                    <strong>H??? t??n: </strong> {infoSV.HOTEN_SV}
                                </p>
                                <p>
                                    <strong>Ng??y sinh: </strong> {moment(infoSV.NGAYSINH_SV).format("DD/MM/YYYY")}
                                </p>
                                <p>
                                    <strong>Email: </strong> {infoSV.EMAIL_SV}
                                </p>
                                <p>
                                    <strong>L???p: </strong> {infoSV.TEN_LOP}
                                </p>
                                <p>
                                    <strong>Chuy??n ng??nh: </strong> {infoSV.TEN_CN}
                                </p>
                                <p>
                                    <strong>Khoa: </strong> {infoSV.TEN_KHOA}
                                </p>
                                <p>
                                    <strong>??i???n tho???i li??n l???c: </strong> {infoSV.SODIENTHOAI_SV}
                                </p>
                                <p>
                                    <strong>?????a ch??? li??n l???c: </strong> {infoSV.TINH_THANH}
                                </p>
                            </aside>
                        </aside>
                        <aside className="border rounded border-secondary">
                            <h5 className="text-center my-2">Th??ng tin gia ????nh</h5>
                            <aside className="ms-4">
                                <p>
                                    <strong>Cha c???a sinh vi??n: </strong> {infoSV.TENCHA_SV}
                                </p>
                                <p>
                                    <strong>Tu???i c???a cha sinh vi??n: </strong> {infoSV.TUOICHA_SV}
                                </p>
                                <p>
                                    <strong>M??? c???a sinh vi??n: </strong> {infoSV.TENME_SV}
                                </p>
                                <p>
                                    <strong>Tu???i c???a m??? sinh vi??n: </strong> {infoSV.TUOIME_SV}
                                </p>
                            </aside>
                        </aside>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseXemThongTin}>
                        Tr??? v???
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> S???A L???I TH??NG TIN: {editInfoSV.HOTEN_SV}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <h3>Th??ng tin c?? b???n</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>M?? s???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_SV"
                                    value={editInfoSV.MA_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? T??n</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_SV"
                                    value={editInfoSV.HOTEN_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Ng??y sinh</strong>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="NGAYSINH_SV"
                                    value={editInfoSV.NGAYSINH_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Gi???i t??nh</strong>
                                </Form.Label>
                                <Form.Select
                                    name="GIOITINH_SV"
                                    value={editInfoSV.GIOITINH_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="1">Nam</option>
                                    <option value="0">N???</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>L???p</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_LOP"
                                    value={editInfoSV.MA_LOP}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    {infoClass &&
                                        infoClass.map((item, idx) => (
                                            <option key={idx} value={item.MA_LOP}>
                                                {item.TEN_LOP}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>S??? ??i???n tho???i</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_SV"
                                    value={editInfoSV.SODIENTHOAI_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Email</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_SV"
                                    value={editInfoSV.EMAIL_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>?????a ch??? li??n l???c</strong>
                                </Form.Label>
                                <Form.Select
                                    name="MA_TINH"
                                    value={editInfoSV.MA_TINH}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    {infoProvince &&
                                        infoProvince.map((item, idx) => (
                                            <option key={idx} value={item.MA_TINH}>
                                                {item.TINH_THANH}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? t??n cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENCHA_SV"
                                    value={editInfoSV.TENCHA_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <h3 className='mt-3'>Th??ng tin gia ????nh</h3>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i c???a cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_SV"
                                    value={editInfoSV.TUOICHA_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? t??n m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_SV"
                                    value={editInfoSV.TENME_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i c???a m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_SV"
                                    value={editInfoSV.TUOIME_SV}
                                    onChange={(e) =>
                                        setEditInfoSV({
                                            ...editInfoSV,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={() => editSinhVien(editInfoSV.MA_SV)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A TH??NG TIN SINH VI??N
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a sinh vi??n <strong>{deleteInfoSV.HOTEN_SV}</strong> n??y ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deteleSinhVien(deleteInfoSV.MA_SV)}>
                        Ch???c ch???n
                    </Button>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        Tr??? v???
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ThongTinSinhVien
