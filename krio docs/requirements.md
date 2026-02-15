# Requirements Document

## Introduction

The Personalized Scheme Recommendations feature is the core matching engine of the Yojana Sathi platform. It analyzes user profiles (age, income, state, occupation, category, etc.) and matches them against government scheme eligibility criteria to provide personalized, relevant scheme recommendations. This feature addresses the critical problem of citizens being unaware of applicable government schemes due to scattered information and complex eligibility criteria.

## Glossary

- **User_Profile**: A collection of user attributes including age, income, state, occupation, category, and other demographic information
- **Scheme**: A government program with defined eligibility criteria and benefits
- **Eligibility_Criteria**: A set of rules defining who qualifies for a specific scheme
- **Recommendation_Engine**: The system component that matches user profiles against scheme eligibility criteria
- **Match_Score**: A numerical value indicating how well a user profile matches a scheme's eligibility criteria
- **Profile_Attribute**: A single piece of user information (e.g., age, income, state)
- **Eligibility_Rule**: A single condition within eligibility criteria (e.g., age >= 18)

## Requirements

### Requirement 1: User Profile Collection

**User Story:** As a citizen, I want to provide my profile information, so that the system can recommend relevant government schemes to me.

#### Acceptance Criteria

1. WHEN a user provides profile information, THE System SHALL validate each attribute against defined constraints
2. WHEN a user submits an incomplete profile, THE System SHALL identify missing required attributes and request them
3. THE System SHALL support profile attributes including age, income, state, occupation, category, gender, and disability status
4. WHEN a user updates their profile, THE System SHALL persist the changes and trigger a new recommendation calculation
5. THE System SHALL validate that age is a positive integer between 0 and 150
6. THE System SHALL validate that income is a non-negative number
7. THE System SHALL validate that state is from a predefined list of Indian states and union territories

### Requirement 2: Scheme Eligibility Matching

**User Story:** As a citizen, I want the system to match my profile against scheme eligibility criteria, so that I receive accurate recommendations.

#### Acceptance Criteria

1. WHEN a user profile is provided, THE Recommendation_Engine SHALL evaluate the profile against all active schemes
2. WHEN evaluating eligibility, THE Recommendation_Engine SHALL check all eligibility rules for each scheme
3. WHEN all eligibility rules for a scheme are satisfied, THE Recommendation_Engine SHALL mark the scheme as eligible
4. WHEN some but not all eligibility rules are satisfied, THE Recommendation_Engine SHALL calculate a partial match score
5. THE Recommendation_Engine SHALL support eligibility rules based on age ranges, income thresholds, state matching, occupation matching, and category matching
6. WHEN a profile attribute is missing, THE Recommendation_Engine SHALL treat schemes requiring that attribute as ineligible
7. THE Recommendation_Engine SHALL process eligibility evaluation within 2 seconds for profiles with up to 10 attributes against 1000 schemes

### Requirement 3: Recommendation Ranking

**User Story:** As a citizen, I want to see the most relevant schemes first, so that I can quickly identify opportunities that best match my situation.

#### Acceptance Criteria

1. WHEN multiple schemes are eligible, THE System SHALL rank them by match score in descending order
2. WHEN calculating match scores, THE System SHALL assign higher scores to schemes where more eligibility criteria are satisfied
3. WHEN two schemes have equal match scores, THE System SHALL rank them by scheme priority or creation date
4. THE System SHALL return at least the top 10 eligible schemes when available
5. WHEN no schemes are fully eligible, THE System SHALL return partially matching schemes ranked by match score

### Requirement 4: Recommendation Results

**User Story:** As a citizen, I want to receive a list of recommended schemes with key information, so that I can understand which schemes apply to me.

#### Acceptance Criteria

1. WHEN recommendations are generated, THE System SHALL return scheme name, description, benefits, and eligibility summary for each recommended scheme
2. WHEN displaying recommendations, THE System SHALL indicate the match score or match percentage for each scheme
3. WHEN a scheme is partially matched, THE System SHALL identify which eligibility criteria are not met
4. THE System SHALL return recommendations in a structured format suitable for frontend display
5. WHEN no schemes match a user profile, THE System SHALL return an empty list with an appropriate message

### Requirement 5: Eligibility Criteria Storage and Retrieval

**User Story:** As a system administrator, I want scheme eligibility criteria to be stored in a structured format, so that the recommendation engine can efficiently evaluate them.

#### Acceptance Criteria

1. THE System SHALL store eligibility criteria in a structured format in the database
2. WHEN storing eligibility rules, THE System SHALL support rule types including numeric ranges, categorical matches, and boolean conditions
3. WHEN retrieving schemes, THE System SHALL include all associated eligibility criteria
4. THE System SHALL support complex eligibility rules with AND/OR logic combinations
5. WHEN eligibility criteria are updated, THE System SHALL immediately use the updated criteria for new recommendations

### Requirement 6: Multi-Attribute Matching

**User Story:** As a citizen with multiple profile attributes, I want the system to consider all my attributes when matching schemes, so that recommendations are comprehensive and accurate.

#### Acceptance Criteria

1. WHEN evaluating eligibility, THE Recommendation_Engine SHALL consider all provided profile attributes
2. WHEN a scheme has multiple eligibility criteria, THE Recommendation_Engine SHALL evaluate all criteria
3. THE Recommendation_Engine SHALL support weighted matching where certain attributes have higher importance
4. WHEN profile attributes conflict with eligibility criteria, THE Recommendation_Engine SHALL mark the scheme as ineligible
5. THE Recommendation_Engine SHALL handle missing optional attributes without marking schemes as ineligible

### Requirement 7: Recommendation Persistence

**User Story:** As a citizen, I want my recommendations to be saved, so that I can review them later without re-entering my profile.

#### Acceptance Criteria

1. WHEN recommendations are generated, THE System SHALL persist them to the database with a timestamp
2. WHEN a user requests their recommendations, THE System SHALL retrieve the most recent recommendations for their profile
3. WHEN a user profile is updated, THE System SHALL mark previous recommendations as outdated
4. THE System SHALL store recommendation history for audit and analytics purposes
5. WHEN retrieving recommendations, THE System SHALL return recommendations generated within the last 24 hours without recalculation

### Requirement 8: Error Handling and Edge Cases

**User Story:** As a citizen, I want the system to handle errors gracefully, so that I receive helpful feedback when issues occur.

#### Acceptance Criteria

1. WHEN the database is unavailable, THE System SHALL return an error message indicating the service is temporarily unavailable
2. WHEN invalid profile data is provided, THE System SHALL return specific validation errors for each invalid attribute
3. WHEN no schemes exist in the database, THE System SHALL return an appropriate message indicating no schemes are available
4. WHEN the recommendation calculation times out, THE System SHALL return partial results if available or an error message
5. THE System SHALL log all errors with sufficient context for debugging

### Requirement 9: API Interface

**User Story:** As a frontend developer, I want a clear API interface for requesting recommendations, so that I can integrate the recommendation engine into the user interface.

#### Acceptance Criteria

1. THE System SHALL provide a REST API endpoint for submitting user profiles and receiving recommendations
2. WHEN the API receives a request, THE System SHALL validate the request format and return appropriate HTTP status codes
3. THE API SHALL accept user profiles in JSON format
4. THE API SHALL return recommendations in JSON format with scheme details and match scores
5. WHEN authentication is required, THE API SHALL validate user tokens before processing requests
6. THE API SHALL support CORS for frontend integration
7. THE API SHALL return responses within 3 seconds for typical requests
