import React, {useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button } from'react-bootstrap'
import Rating from '../Components/Rating'
import axios from 'axios'
//import products from '../products' //this is an array of products
//to get single products 

const ProductScreen = ({match}) => { //destructure of match
    const[product,setproduct] = useState({})
    useEffect(() => {
        const fetchProduct = async() =>{
             const { data } = await axios.get(`/api/products/${match.params.id}`)
             
             setproduct(data)
        }
        fetchProduct()
     }, [] )
    
    return (
        <>
        <Link className='btn btn-dark my-3' to ='/'>
            Go Back
        </Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={` ${product.numReviews} Reviews`}/>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Price:</strong> ₹{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description:</strong> {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card className='p-1'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price: 
                                </Col>
                                <Col>
                                <strong>₹{product.price}</strong>

                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status: 
                                </Col>
                                <Col>
                                {product.countInStock >0 ? 'In Stock' : 'Out Of Stock'}

                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
        </>
    )
}

export default ProductScreen