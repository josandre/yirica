import React from 'react'
import InnerAppLayout from '../../../../layouts/inner-app-layout';
import CommentContent from './CommentContent';
import CommentsMenu from './CommentsMenu';

const Comments = props => {
	return (
		<div className="chat">
			<InnerAppLayout 
				sideContent={<CommentsMenu {...props}/>}
				mainContent={<CommentContent {...props}/>}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default Comments
