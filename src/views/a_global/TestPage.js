import React, {useState, useEffect} from 'react'
import {get_Prom} from './Api'
import {Table, Spinner} from 'react-bootstrap'




export default function TestPage(){
	const [prom, setProm] = useState();

	// useEffect( async()=>{
	// 	console.log('get')
	// 	const result = await get_Prom('/Users');

	// 	console.log(result)
	// 	// setProm(result);

	// }, [])


	return(
				<div className="container">
			<Table striped hover>
				<thead>
					<tr>
						<th>序号</th>
						<th>姓名</th>
						<th>编号</th>
						<th>职位</th>
						<th>手机号</th>
						<th>管理员工</th>
					</tr>
				</thead>
				<tbody>
					
				
					<Spinner animation="border" variant="primary" />
					{"   "}加载中。。。
				</tbody>
			</Table>
		</div>
	)
}