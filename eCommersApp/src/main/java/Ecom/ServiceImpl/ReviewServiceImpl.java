package Ecom.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ecom.Exception.ProductException;
import Ecom.Exception.ReviewException;
import Ecom.Exception.UserException;
import Ecom.Model.Product;
import Ecom.Model.Review;
import Ecom.Model.User;
import Ecom.Repository.ProductRepository;
import Ecom.Repository.ReviewRepository;
import Ecom.Repository.UserRepository;
import Ecom.Service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

	private final ProductRepository productRepository;

	private final ReviewRepository reviewRepository;

	private final UserRepository userRepository;

	@Autowired
	public ReviewServiceImpl(ProductRepository productRepository, ReviewRepository reviewRepository,
			UserRepository userRepository) {
		this.userRepository = userRepository;
		this.productRepository = productRepository;
		this.reviewRepository = reviewRepository;

	}

	@Override
	public Review addReviewToProduct(Integer productId, Integer userId, Review review) throws ReviewException {
		Product existingProduct = productRepository.findById(productId)
				.orElseThrow(() -> new ReviewException("Product Not Found"));

		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new ReviewException("User Not Found In Database"));

		existingUser.getReviews().add(review);
		review.setUser(existingUser);
		existingProduct.getReviews().add(review);
		review.setProduct(existingProduct);
		userRepository.save(existingUser);
		productRepository.save(existingProduct);

		return reviewRepository.save(review);
	}

	@Override
	public Review updateReviewToProduct(Integer reviewId, Review review) throws ReviewException {
		Review existingReview = reviewRepository.findById(reviewId)
				.orElseThrow(() -> new ReviewException("User Not Found In Database"));

		existingReview.setComment(review.getComment());
		existingReview.setRating(review.getRating());
		return existingReview;
	}

	@Override
	public void deleteReview(Integer reviewId) throws ReviewException {
		Review existingReview = reviewRepository.findById(reviewId)
				.orElseThrow(() -> new ReviewException("User Not Found In Database"));
		
		reviewRepository.delete(existingReview);

	}

	@Override
	public List<Review> getAllReviewOfProduct(Integer productId) throws ReviewException {
		Product existingProduct = productRepository.findById(productId)
				.orElseThrow(() -> new ReviewException("Product Not Found"));
		
		List<Review> allReviewsByProductId = reviewRepository.findAllReviewsByProductId(productId);
		if(allReviewsByProductId.isEmpty()) { 
			 throw new ReviewException ("Product Not Found");
		}
		return allReviewsByProductId;
	}

}
