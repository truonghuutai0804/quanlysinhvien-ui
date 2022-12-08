import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { GiReturnArrow } from 'react-icons/gi'
import { MdAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const QuanLyNamHoc = () => {
    const [data, setData] = useState([])
    const [createInput, setCreateInput] = useState([])
    const [editData, setEditData] = useState([])
    const [deleteData, setDeleteData] = useState([])

    const [showThemMoi, setShowThemMoi] = useState(false)
    const [showSuaLai, setShowSuaLai] = useState(false)
    const [showXoa, setShowXoa] = useState(false)

    const handleShowThemMoi = () => setShowThemMoi(true)
    const handleShowSuaLai = (info) => {
        setEditData(info)
        setShowSuaLai(true)
    }
    const handleShowXoa = (info) => {
      setShowXoa(true)
      setDeleteData(info)
    }

    const handleCloseThemMoi = () => {
      setCreateInput()
      setShowThemMoi(false)
    }
    const handleCloseSuaLai = () => setShowSuaLai(false)
    const handleCloseXoa = () => setShowXoa(false)

    const get = useCallback(async () => {
        try {
            const options = {
                method: 'get',
                url: 'http://localhost:8080/api/year',
            }
            const response = await axios(options)
            const datas = response.data.data
            if (response.data.message === 'SUCCESS') {
                setData(datas)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const create = async () => {
        try {
            const options = {
                method: 'post',
                url: 'http://localhost:8080/api/year',
                data: createInput,
            }
            const response = await axios(options)
            if (response.data.message === 'SUCCESS') {
                Swal.fire('Thành công', 'Bạn đã thêm thành công ', 'success')
                handleCloseThemMoi()
                get()
            } else {
                Swal.fire('Thất bại', 'Bạn đã thêm thất bại ', 'error')
                handleCloseThemMoi()
            }
        } catch (error) {
            Swal.fire('Thất bại', 'Bạn đã thêm thất bại ', 'error')
            handleCloseThemMoi()
        }
    }

    const update = async (id) => {
      try {
          const options = {
              method: 'put',
              url: `http://localhost:8080/api/year/${id}`,
              data: editData,
          }
          const response = await axios(options)
          if (response.data.message === 'SUCCESS') {
              Swal.fire('Thành công', 'Bạn đã sửa thành công ', 'success')
              handleCloseSuaLai()
              get()
          } else {
              Swal.fire('Thất bại', 'Bạn đã sửa thất bại ', 'error')
              handleCloseSuaLai()
          }
      } catch (error) {
          Swal.fire('Thất bại', 'Bạn đã sửa thất bại ', 'error')
          handleCloseSuaLai()
      }
  }

  const Delete = async (id) => {
    try {
        const options = {
            method: 'delete',
            url: `http://localhost:8080/api/year/${id}`,
        }
        const response = await axios(options)
        if (response.data.message === 'SUCCESS') {
            Swal.fire('Thành công', 'Bạn đã xóa thành công ', 'success')
            handleCloseXoa()
            get()
        } else {
            Swal.fire('Thất bại', 'Bạn đã xóa thất bại ', 'error')
            handleCloseXoa()
        }
    } catch (error) {
        Swal.fire('Thất bại', 'Bạn đã xóa thất bại ', 'error')
        handleCloseXoa()
    }
}

    useEffect(() => {
        get()
    }, [get])

    return (
        <>
            <Container>
                <aside className="ms-4">
                    <aside className="d-flex m-3">
                        <Link className="btn btn-outline-secondary" to="/Trainer">
                            <GiReturnArrow /> Quay Lại
                        </Link>
                    </aside>
                    <h2 className="my-5 text-center">QUẢN LÝ NĂM HỌC</h2>
                    <Button onClick={handleShowThemMoi}>Thêm năm học mới</Button>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã năm học</th>
                                <th>Năm học</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="table-text-center">{idx + 1}</td>
                                        <td className="table-text-center">{item.MA_NH}</td>
                                        <td className="table-text-center">{item.NAM_HOC}</td>
                                        <td className="table-text-center">
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
                        THÊM NĂM HỌC MỚI
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã năm học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="MA_NH"
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Năm học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="NAM_HOC"
                                onChange={(e) => setCreateInput({ ...createInput, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseThemMoi}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={create}>
                        Tạo mới
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuaLai} onHide={handleCloseSuaLai} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-edit">
                        <FaEdit size={50} /> SỬA LẠI THÔNG TIN NĂM HỌC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Mã năm học</strong>
                            </Form.Label>
                            <Form.Control type="text" value={editData.MA_NH} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Năm học</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="NAM_HOC"
                                value={editData.NAM_HOC}
                                onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuaLai}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => update(editData.MA_NH)}>
                        Lưu lại
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showXoa} onHide={handleCloseXoa} animation={true} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="infor-remove">
                        <FaTrashAlt size={50} /> XÓA THÔNG TIN NĂM HỌC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có chắc chắn xóa thông tin của năm học <strong>{deleteData.NAM_HOC}</strong> này ?
                    </p>
                    <strong>Lưu ý:</strong> Nếu xóa thông tin sẽ mất vĩnh viễn
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => Delete(deleteData.MA_NH)}>
                        Chắc chắn
                    </Button>
                    <Button variant="secondary" onClick={handleCloseXoa}>
                        Trở về
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuanLyNamHoc
