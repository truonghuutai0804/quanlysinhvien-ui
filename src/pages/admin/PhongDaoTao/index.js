import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { MdAddBox } from 'react-icons/md'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

function PhongDaoTao() {
    const [teacher, setTeacher] = useState([])
    const [infoProvince, setInfoProvince] = useState([])
    const [create, setCreate] = useState([])
    const [deleteTeacher, setDeleteTeacher] = useState([])
    const [edit, setEdit] = useState([])
    const [seeTeacher, setSeeTeacher] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showXemThongTin, setShowXemThongTin] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => {
        getTinh()
        setShowThemMoi(true)
    }
    const handleShowXemThongTin = (info) => {
        setSeeTeacher(info)
        setShowXemThongTin(true)
    }
    const handleShowSuaLai = (info) => {
        getTinh()
        setEdit(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
        setDeleteTeacher(info)
        setShowXoa(true)
    }

    const handleCloseThemMoi = () => setShowThemMoi(false)
    const handleCloseXemThongTin = () => setShowXemThongTin(false)
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

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


    const getGiaoVien = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/trainer',
            }
            const response = await axios(options)
            const teachers = response.data.dataPDT
            if (response.data.status === 400) {
                setTeacher(teachers)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const setGiaoVien = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/trainer',
                data: create,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseThemMoi()
                Swal.fire('Th??nh c??ng', 'B???n ???? th??m m???i th??nh c??ng ', 'success')
                getGiaoVien()
            }else{
                Swal.fire('Th???t b???i', 'B???n ???? th??m m???i th???t b???i ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editGiaoVien = async (id) => {
        try {
            const options = {
                method: 'put',
                url: `http://localhost:8080/api/trainteacher/${id}`,
                data: edit,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseSuaLai()
                Swal.fire('Th??nh c??ng', 'B???n ???? s???a th??nh c??ng ', 'success')
                getGiaoVien()
            }else{
                Swal.fire('Th???t b???i', 'B???n ???? s???a th???t b???i ', 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteGiaoVien = async (id) => {
        try {
            const options = {
                method: 'delete',
                url: `http://localhost:8080/api/trainteacher/${id}`,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                handleCloseXoa()
                Swal.fire('Th??nh c??ng', 'B???n ???? x??a th??nh c??ng ', 'success')
                getGiaoVien()
            }
        } catch (error) {
            Swal.fire('Th???t b???i', `L???i ${error}`, 'error')
        }
    }

    useEffect(() => {
        getGiaoVien()
    }, [getGiaoVien])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <h2 className="my-3 text-center">DANH S??CH PH??NG ????O T???O</h2>
                    <Button variant="outline-primary" className="mb-3 ms-4" onClick={handleShowThemMoi}>
                        <MdAddBox /> Th??m ph??ng ????o t???o m???i
                    </Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>M??</th>
                                <th>H??? t??n</th>
                                <th>Gi???i t??nh</th>
                                <th>Ng??y sinh</th>
                                <th>S??? ??i???n tho???i</th>
                                <th>?????a ch???</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacher &&
                                teacher.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td>{item.MA_GV}</td>
                                        <td>{item.HOTEN_GV}</td>
                                        <td>{item.GIOITINH_GV === 1 ? 'Nam' : 'N???'}</td>
                                        <td>{moment(item.NGAYSINH_GV).format('DD/MM/YYYY')}</td>
                                        <td>{item.SODIENTHOAI_GV}</td>
                                        <td>{item.TINH_THANH}</td>
                                        <td className="table-text-center">
                                            <strong className="infor-see" onClick={() => handleShowXemThongTin(item)}>
                                                <FaEye />
                                            </strong>
                                            <strong className="infor-edit" onClick={() => handleShowSuaLai(item)}>
                                                <FaEdit />
                                            </strong>
                                            <strong className="infor-remove" onClick={() => handleShowXoa(item)}>
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
                        TH??M PH??NG ????O T???O M???I
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
                                name="MA_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
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
                                name="HOTEN_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Ng??y sinh</strong>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="NGAYSINH_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Gi???i t??nh</strong>
                            </Form.Label>
                            <Form.Select
                                name="GIOITINH_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            >
                                <option value=" ">Ch???n gi???i t??nh</option>
                                <option value="1">Nam</option>
                                <option value="0">N???</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>S??? ??i???n tho???i</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="SODIENTHOAI_GV"
                                onChange={(e) =>
                                    setCreate({ ...create, [e.target.name]: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Email c?? nh??n</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EMAIL_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
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
                                    setCreate({ ...create, [e.target.name]: e.target.value })
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
                                    name="TENCHA_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i cha</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOICHA_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? t??n m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENME_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Tu???i m???</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TUOIME_GV"
                                    onChange={(e) =>
                                        setCreate({ ...create, [e.target.name]: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        H???y
                    </Button>
                    <Button variant="primary" onClick={setGiaoVien}>
                        T???o m???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXemThongTin} onHide={handleCloseXemThongTin} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-see">
                        <FaEye size={50} /> TH??NG TIN PH??NG ????O T???O
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <aside className="border rounded border-secondary mb-2">
                            <h5 className="text-center my-2">Th??ng tin c?? b???n</h5>
                            <aside className="ms-2">
                                <p>
                                    <strong>M?? s???: </strong> {seeTeacher.MA_GV}
                                </p>
                                <p>
                                    <strong>H??? t??n: </strong> {seeTeacher.HOTEN_GV}
                                </p>
                                <p>
                                    <strong>Ng??y sinh: </strong> {moment(seeTeacher.NGAYSINH_GV).format('DD/MM/YYYY')}
                                </p>
                                <p>
                                    <strong>??i???n tho???i li??n l???c: </strong> {seeTeacher.SODIENTHOAI_GV}
                                </p>
                                <p>
                                    <strong>Email: </strong> {seeTeacher.EMAIL_GV}
                                </p>
                                <p>
                                    <strong>?????a ch??? li??n l???c: </strong> {seeTeacher.TINH_THANH}
                                </p>
                            </aside>
                        </aside>
                        <aside className="border rounded border-secondary">
                            <h5 className="text-center my-2">Th??ng tin gia ????nh</h5>
                            <aside className="ms-2">
                                <p>
                                    <strong>Cha c???a nh??n vi??n: </strong> {seeTeacher.TENCHA_GV}
                                </p>
                                <p>
                                    <strong>Tu???i c???a cha nh??n vi??n: </strong> {seeTeacher.TUOICHA_GV}
                                </p>
                                <p>
                                    <strong>M??? c???a nh??n vi??n: </strong> {seeTeacher.TENME_GV}
                                </p>
                                <p>
                                    <strong>Tu???i c???a m??? nh??n vi??n: </strong> {seeTeacher.TUOIME_GV}
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
                        <FaEdit size={50} /> S???A L???I TH??NG TIN PH??NG ????O T???O
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
                                    value={edit.MA_GV}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>H??? T??n</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="HOTEN_GV"
                                    value={edit.HOTEN_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="NGAYSINH_GV"
                                    value={edit.NGAYSINH_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="GIOITINH_GV"
                                    value={edit.GIOITINH_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    <strong>S??? ??i???n tho???i</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SODIENTHOAI_GV"
                                    value={edit.SODIENTHOAI_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="EMAIL_GV"
                                    value={edit.EMAIL_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    value={edit.MA_TINH}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TENCHA_GV"
                                    value={edit.TENCHA_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TUOICHA_GV"
                                    value={edit.TUOICHA_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TENME_GV"
                                    value={edit.TENME_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                                    name="TUOIME_GV"
                                    value={edit.TUOIME_GV}
                                    onChange={(e) =>
                                        setEdit({
                                            ...edit,
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
                    <Button variant="primary" onClick={()=>editGiaoVien(edit.MA_GV)}>
                        L??u l???i
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> X??A TH??NG TIN PH??NG ????O T???O
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        B???n c?? ch???c ch???n x??a th??ng tin c???a ph??ng ?????o t???o <strong>{deleteTeacher.HOTEN_GV}</strong> n??y ?
                    </p>
                    <strong>L??u ??:</strong> N???u x??a th??ng tin s??? m???t v??nh vi???n
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteGiaoVien(deleteTeacher.MA_GV)}>
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

export default PhongDaoTao
